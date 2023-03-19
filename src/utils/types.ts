export enum HomeRoutes {
  SQLITE = 'Sqlite',
  WATERMELON = 'Watermelon',
}

export type HomeStackProps = {
  [HomeRoutes.SQLITE]:
    | {
        data: string | null;
      }
    | undefined;
  [HomeRoutes.WATERMELON]:
    | {
        data: string | null;
      }
    | undefined;
};
