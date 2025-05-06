import React from "react";
import { Meta } from "@storybook/react";

import {
  FileIcon,
  TrashIcon,
  FallbackUserIcon,
  SeparatorIcon,
  ArrowUpIcon,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  StarIcon,
  ChevronDownIcon,
  EyeIcon,
  EyeSlashIcon,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  CodeIcon,
  ListUlIcon,
  ListOlIcon,
  UndoIcon,
  RedoIcon,
  EraserIcon,
  FolderIcon,
  PlusCircleIcon,
} from "@/Icons";

const meta: Meta = {
  title: "Icons/All Custom Icons",
};

export default meta;

const iconList = [
  { name: "File", Component: FileIcon },
  { name: "Trash", Component: TrashIcon },
  { name: "FallbackUser", Component: FallbackUserIcon },
  { name: "Separator", Component: SeparatorIcon },
  { name: "Arrow Up", Component: ArrowUpIcon },
  { name: "Close", Component: CloseIcon },
  { name: "Arrow Left", Component: ArrowLeftIcon },
  { name: "Arrow Right", Component: ArrowRightIcon },
  { name: "Star", Component: StarIcon },
  { name: "Arrow Down", Component: ChevronDownIcon },
  { name: "Eye", Component: EyeIcon },
  { name: "Eye Closed", Component: EyeSlashIcon },
  { name: "Bold", Component: BoldIcon },
  { name: "Italic", Component: ItalicIcon },
  { name: "Strike through", Component: StrikethroughIcon },
  { name: "Code", Component: CodeIcon },
  { name: "List Ul", Component: ListUlIcon },
  { name: "List Ol", Component: ListOlIcon },
  { name: "Undo", Component: UndoIcon },
  { name: "Redon", Component: RedoIcon },
  { name: "Eraser", Component: EraserIcon },
  { name: "Folder", Component: FolderIcon },
  { name: "Plus Circle", Component: PlusCircleIcon },
];

export const AllIcons = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 100px)",
      gap: "20px",
    }}
  >
    {iconList.map(({ name, Component }) => (
      <div key={name} style={{ textAlign: "center" }}>
        <Component width={32} height={32} />
        <div style={{ fontSize: 12, marginTop: 4 }}>{name}</div>
      </div>
    ))}
  </div>
);
