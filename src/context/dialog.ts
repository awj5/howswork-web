import { createContext, type Dispatch, type SetStateAction } from "react";

export type FeedbackDialogType = {
  open: boolean;
  flagConcern: boolean;
};

export type DialogContextValue = {
  concernDialog: boolean;
  setConcernDialog: Dispatch<SetStateAction<boolean>>;
  feedbackDialog: FeedbackDialogType | null;
  setFeedbackDialog: Dispatch<SetStateAction<FeedbackDialogType | null>>;
};

export const DialogContext = createContext<DialogContextValue | null>(null);
