export const INTERVAL_LIST = [1, 1, 0.5, 1, 1, 1, 0.5];

export const NOTE_LIST = ["C", "D", "E", "F", "G", "A", "B"];

/** 处理半音 */
export enum OperateSemitone {
  /** 降半音 */
  flat = "flat",
  /** 升半音 */
  sharp = "sharp",
}

/** 半音符号 */
export const SEMITONE_SYMBOL = {
  [OperateSemitone.flat]: "♭",
  [OperateSemitone.sharp]: "♯",
};

/** 计算半音 */
export const SEMITONE_CALCULATE = {
  [OperateSemitone.flat]: -0.5,
  [OperateSemitone.sharp]: 0.5,
};

/** 四度音的计算，如果中间间隔了 4 个音名，则为四度音 */
export const FOUR_TONE_OPTIONS = [
  {
    label: "减四度",
    value: 2.5,
  },
  {
    label: "增四度",
    value: 3,
  },
];

/** 五度音的计算，如果中间间隔了 5 个音名，则为五度音 */
export const FIVE_TONE_OPTIONS = [
  {
    label: "减五度",
    value: 3,
  },
  {
    label: "增五度",
    value: 4,
  },
];

export const TONE_OPTIONS = [
  {
    label: "同度",
    value: 0,
  },
  {
    label: "小二度",
    value: 0.5,
  },
  {
    label: "大二度",
    value: 1,
  },
  {
    label: "小三度",
    value: 1.5,
  },
  {
    label: "大三度",
    value: 2,
  },
  {
    label: "纯四度",
    value: 2.5,
  },
  {
    label: "纯五度",
    value: 3.5,
  },
  {
    label: "小六度",
    value: 4,
  },
  {
    label: "大六度",
    value: 4.5,
  },
  {
    label: "小七度",
    value: 5,
  },
  {
    label: "大七度",
    value: 5.5,
  },
  {
    label: "八度",
    value: 6,
  },
];

export const TONE_CALCULATE_TIPS = [];
