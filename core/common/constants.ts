export enum LevelType {
  junior = 'junior',
  middle = 'middle',
  senior = 'senior',
}

export const LEVEL_OPTIONS = [
  {
    label: '初级',
    value: LevelType.junior,
  },
  {
    label: '中级',
    value: LevelType.middle,
  },
  {
    label: '高级',
    value: LevelType.senior,
  },
];

export const QUWETION_LEVEL_MAP = {
  [LevelType.junior]: 3,
  [LevelType.middle]: 5,
  [LevelType.senior]: 7,
}

export const SOLMIZATIOINS = [1, 2, 3, 4, 5, 6, 7];
export const SOLMIZATIOINS_SING = ['do', 're', 'mi', 'fa', 'sol', 'la', 'xi'];
