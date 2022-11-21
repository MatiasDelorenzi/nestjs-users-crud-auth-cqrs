export const queryBusMock = (): unknown => ({
  execute: async (): Promise<jest.Mock> => jest.fn().mockReturnThis(),
});
