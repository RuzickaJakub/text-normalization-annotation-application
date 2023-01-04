import { ReactNode, useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Sentence } from "../types/Sentence";
import { computeRelativeOffset } from "../utils/computeRelativeOffset";
import { getTokenTypeColor } from "../utils/getTokenTypeColor";
import NormalizeFormDialog from "./NormalizeFormDialog";

export default function HighlightedText(props: {
  text: string;
  color: string;
  name: string;
}) {
  const { text, color, name } = props;
  const { control } = useFormContext<Sentence>();
  const { fields, insert } = useFieldArray({
    control,
    name: `${name}` as `tokens`,
  });

  const elements: ReactNode[] = [];
  let lastElementEnd = 0;
  fields.forEach((value, index) => {
    const { begin, end, type } = value;
    const color = getTokenTypeColor(type);
    if (begin !== 0) {
      // If the text start with highlighted item then don't start with normal text.
      elements.push(text.slice(lastElementEnd, begin));
    }
    elements.push(
      <HighlightedText
        key={value.id}
        text={text.slice(begin, end)}
        color={color}
        name={`${name}.${index}.children`}
      />
    );
    lastElementEnd = end;
  });
  elements.push(text.slice(lastElementEnd));

  const [selectedText, setSelectedText] = useState<string>("");
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(0);

  const [open, setOpen] = useState<boolean>(false);

  const { watch } = useFormContext<Sentence>();

  const ref = useRef<HTMLSpanElement>(null);

  const handleClickOpen = (event: MouseEvent) => {
    const selection = window.getSelection()!;
    if (selection.anchorNode?.parentNode !== ref.current) {
      //Stop do not react on the selection from nested nodes
      return;
    }
    if (selection.anchorNode !== selection.focusNode) {
      window.alert("The selection is invalid, only nesting is possible.");
      return;
    }
    const range = selection.getRangeAt(0);

    const text = watch("original_sentence", "");
    const start =
      range.startOffset + computeRelativeOffset(selection.anchorNode!, text);
    const end =
      range.endOffset + computeRelativeOffset(selection.focusNode!, text);

    setSelectedText(window.getSelection()?.toString()!);
    setStart(start);
    setEnd(end);
    setOpen(true);
  };

  useEffect(() => {
    ref.current?.addEventListener("mouseup", handleClickOpen);
    return () => ref.current?.removeEventListener("mouseup", handleClickOpen);
  });

  return (
    <span
      ref={ref}
      style={{
        backgroundColor: color,
        padding: 10,
        borderRadius: 20,
      }}
    >
      {elements}
      <NormalizeFormDialog
        text={selectedText}
        start={start}
        end={end}
        open={open}
        setOpen={setOpen}
        insert={insert}
        fields={fields}
      />
    </span>
  );
}
