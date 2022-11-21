export const commandBusMock = (): unknown => ({
  execute: async (): Promise<jest.Mock> => jest.fn().mockReturnThis(),
});
