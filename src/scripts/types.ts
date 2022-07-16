enum DateFormat {
  US,
  EU,
}

export type ExtractedDate = {
  date: string;
  matchIndex: number;
  format?: DateFormat;
};
