"""The file contains all backend routes accepted by the Flask on the server."""

import json
import os
from zipfile import ZipFile
from pathlib import Path
from flask import request, send_from_directory

import sanitize_filename

from app import create_app

app = create_app()

USER_DATA = "user-data"
EXPORTS = "exports"


# pylint: disable=R0914 # The function has intentionaly greater number of local variables.
@app.route("/api/get-datasets", methods=["GET"])
def get_dataset():
    """Retrieve all datasets by the user specified as the `username` parameter.

    For each dataset the following is specified
    - name
    - sentence_count
    - annotated_count
    - last_approved

    Returns
    -------
    List
        Returns empty list or list containing all dataset of the user.
    """
    username = request.args.get("username", "unknown")
    if username == "":
        return json.dumps({"success": False, "errors": ["Username not valid"]})

    user_directory = os.path.join(USER_DATA, username)
    if not os.path.exists(user_directory):
        return json.dumps([])
    files = os.listdir(user_directory)
    datasets = []
    for file in files:
        file_path = os.path.join(user_directory, file)
        if file.endswith(".txt"):
            annotation_path = f"{file_path}.json"
            with open(file_path, "r", encoding="UTF-8") as dataset_file:
                sentence_count = len(dataset_file.readlines())
            last_approved = 0
            if os.path.exists(annotation_path):
                with open(annotation_path, "r", encoding="UTF-8") as json_file:
                    annotated_data = json.load(json_file)
                    annotated_count = len(annotated_data)
                for key in annotated_data.keys():
                    sentence = annotated_data[key]
                    state = sentence["sentence_state"]
                    sentence_id = sentence["sentence_id"]
                    if state == "Approved" and sentence_id > last_approved:
                        last_approved = sentence_id
            else:
                annotated_count = 0
            datasets.append(
                {
                    "name": file.removesuffix(".txt"),
                    "sentence_count": sentence_count,
                    "annotated_count": annotated_count,
                    "last_approved": last_approved,
                }
            )
    return json.dumps(datasets)


@app.route("/api/save-sentence", methods=["POST"])
def save_sentence():
    """Save the sentence received as the request data.

    Data are stored in form of a JSON file.

    Returns
    -------
    {success: bool, errors: List[str]}
        The result of the saving is indicated with the `success` field. In case
        of fail errors are in the `errors` field.
    """
    username = request.form.get("username", "unknown")
    sentence = request.form.get("sentence", None)
    if sentence is None:
        return json.dumps({"success": False, "errors": ["No sentence provided"]})
    sentence_json = json.loads(sentence)
    dataset_filename = sentence_json["dataset_name"]
    if not dataset_filename.endswith(".txt"):
        dataset_filename += ".txt"
    sentence_id = sentence_json["sentence_id"]
    if dataset_filename == "" or sentence_id == "":
        return json.dumps({"success": False, "errors": ["Sentence data not provided"]})
    user_directory = os.path.join(USER_DATA, username)
    dataset_filename = os.path.join(user_directory, f"{dataset_filename}.json")
    if not os.path.exists(dataset_filename):
        with open(dataset_filename, "w", encoding="UTF-8") as file:
            file.write("{}")

    with open(dataset_filename, "r", encoding="UTF-8") as json_file:
        try:
            data = json.load(json_file)
        # pylint: disable=W0703 # Catching all exceptions.
        except Exception:
            data = {}

    with open(dataset_filename, "w", encoding="UTF-8") as json_file:
        if len(sentence_json["tokens"]) == 0:
            data.pop(str(sentence_id), None)
        else:
            data[str(sentence_id)] = sentence_json
        json.dump(data, json_file)
    return json.dumps({"success": True, "errors": []})


def find_annotated_sentence(dataset_filename: str, sentence_id: int):
    """Find the annotated sentence or returns None.

    Parameters
    ----------
    dataset_filename
        Filename where the annotated data are stored.
    sentence_id
        Id of the sentence.

    Returns
    -------
    str | None
        If the sentence is present in the annotations, return it. Otherwise
        return None.
    """
    sentence_id = str(sentence_id)
    annotated_filename = f"{dataset_filename}.json"
    if os.path.exists(annotated_filename):
        with open(annotated_filename, "r", encoding="UTF-8") as json_file:
            data = json.load(json_file)
        sentence = data.get(sentence_id)
        return sentence
    return None


@app.route("/api/get-sentence", methods=["GET"])
def get_sentence():
    """Get specified sentence from the dataset.

    The sentence is retrieved based on the `username`, `dataset_name` and
    `sentence_id`, that are specified as request parameters.

    Returns
    ------
    {
        success: bool,
        errors: List[str],
        sentence: Sentence | None
    }
        The `success` indicates whether the get-sentence parameters are valid -
        if not then the `errors` contains the errors encountered. If the params
        are valid then the annotated sentence if present or the base sentence is returned.
    """
    username = request.args.get("username", "unknown")
    dataset_name = request.args.get("dataset_name", "")
    sentence_id = request.args.get("sentence_id", "0")
    if dataset_name == "" or username == "" or not sentence_id.isnumeric():
        return json.dumps(
            {
                "success": False,
                "errors": [
                    "Not all data correctly provided (username, dataset name, sentence_id)"
                ],
                "sentence": None,
            }
        )
    if not dataset_name.endswith(".txt"):
        dataset_name += ".txt"
    user_directory = os.path.join(USER_DATA, username)
    dataset_filename = os.path.join(user_directory, dataset_name)

    sentence_id = int(sentence_id)
    with open(dataset_filename, "r", encoding="UTF-8") as dataset:
        lines = dataset.readlines()
        if len(lines) == 0:
            return json.dumps(
                {"success": False, "errros": ["Dataset is empty"], "sentence": None}
            )
        if sentence_id < 0:
            # For to low index return the first sentence
            sentence_id = 0
        elif sentence_id >= len(lines):
            # For to high index return the last sentence
            sentence_id = len(lines) - 1
        sentence = find_annotated_sentence(dataset_filename, sentence_id)
        if sentence is not None:
            # Returns annotated sentence
            return json.dumps({"success": True, "errors": [], "sentence": sentence})
        original_sentence = lines[sentence_id]
    data_json = {
        "dataset_name": dataset_name.removesuffix(".txt"),
        "sentence_id": sentence_id,
        "sentence_state": "Unannotated",
        "original_sentence": original_sentence.strip("\r\n\t "),
        "normalized_sentence": original_sentence.strip("\r\n\t "),
        "tokens": [],
    }
    return json.dumps({"success": True, "errros": [], "sentence": data_json})


@app.route("/api/upload/data", methods=["POST"])
def upload_data():
    """Route for uploading the datasets or files with sentence.

    The `username` parameter is used to identify the current user.

    Returns
    -------
    {success: bool, errors: List[str]}
        The result of the upload is indicated with the `success` field. In case
        of fail errors are in the `errors` field.
    """
    username = request.form.get("username", "unknown")
    if username == "":
        return json.dumps(
            {
                "success": False,
                "errors": ["Name not valid"],
            }
        )
    filename = request.form.get("filename", "file.txt")
    file = request.files["file"]
    filename = sanitize_filename.sanitize(filename)
    user_directory = os.path.join(USER_DATA, username)
    if filename.endswith(".zip"):
        # Extract it and store
        with ZipFile(file, "r") as zfile:
            zfile.extractall(user_directory)
        return json.dumps(
            {
                "success": True,
                "errors": [],
            }
        )

    if not filename.endswith(".txt") and not filename.endswith(".json"):
        return json.dumps(
            {
                "success": False,
                "errors": ["Not valid file"],
            }
        )
    Path(user_directory).mkdir(parents=True, exist_ok=True)
    file.save(os.path.join(user_directory, filename))
    return json.dumps(
        {
            "success": True,
            "errors": [],
        }
    )


@app.route("/api/export/data", methods=["GET"])
def export_data():
    """Exports all the data for the current user (`username`).
    With the specified `filename`.

    Returns
    -------
    File
        The exported file to be downloaded.
    """
    username = request.args.get("username", "unknown")
    filename = request.args.get("filename", "")

    user_directory = os.path.join(USER_DATA, username)

    if not os.path.exists(EXPORTS):
        Path(EXPORTS).mkdir(parents=True, exist_ok=True)

    if filename == "":
        # Export all files as a zip file
        zip_filename = f"Export-{username}.zip"  # zip file name
        zip_path = os.path.join(EXPORTS, zip_filename)
        with ZipFile(zip_path, "w") as zip_file:
            files = os.listdir(user_directory)
            for file in files:
                file_name = os.path.join(user_directory, file)
                zip_file.write(
                    file_name, arcname=os.path.relpath(file_name, user_directory)
                )
        return send_from_directory(
            directory=EXPORTS, path=zip_filename, as_attachment=True
        )
    # The directory should be flat without any subdirectories
    return send_from_directory(directory=user_directory, path=filename)
