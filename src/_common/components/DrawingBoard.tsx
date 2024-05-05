"use client";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import { useMutation } from "@tanstack/react-query";
import debounce from "just-debounce";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import DrawingMenu from "./DrawingMenu";

const Excalidraw = React.memo(
  dynamic(async () => (await import("@excalidraw/excalidraw")).Excalidraw, {
    ssr: false,
  })
);

interface Prop {
  boardId: string;
  initialData?: { elements: string; appStates: string };
}

const DrawingBoard: React.FC<Prop> = ({ initialData, boardId }) => {
  const [api, setApi] = useState<ExcalidrawImperativeAPI | null>(null);

  const { mutateAsync } = useMutation({
    mutationFn: async (data: string) =>
      await fetch(`/api/boards?id=${data}`, {
        method: "PATCH",
        body: JSON.stringify({
          elements: JSON.stringify(api?.getSceneElements()),
          appStates: JSON.stringify(api?.getAppState()),
        }),
      }),
  });
  const debouncedHandleOnChange = debounce(async () => {
    mutateAsync(boardId);
  }, 500);

  const ExcaliDrawMemo = useMemo(() => {
    return (
      <Excalidraw
        excalidrawAPI={setApi}
        onChange={debouncedHandleOnChange}
        initialData={{ elements: JSON.parse(initialData?.elements ?? "[]") }}
      >
        <DrawingMenu />
      </Excalidraw>
    );
  }, [initialData]);

  return <div className="h-[100vh]">{ExcaliDrawMemo}</div>;
};

export default React.memo(DrawingBoard);
