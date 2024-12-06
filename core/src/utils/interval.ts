import { LevelType } from "../constants/index";
import { getRandomIndex, shuffleArray } from "./random";
import {
  TONE_OPTIONS,
  FOUR_TONE_OPTIONS,
  FIVE_TONE_OPTIONS,
  INTERVAL_LIST,
  NOTE_LIST,
} from "../constants/interval";

/** 获取答案 */
export function getAnswer(intervalNoteList: string[], interval: number) {
  // 特殊处理四度音和五度音
  const intervalNoteLen = intervalNoteList.length;
  let answer = TONE_OPTIONS.find(({ value }) => value === interval);
  if (intervalNoteLen === 4) {
    // 四度音
    if (!answer) {
      answer = FOUR_TONE_OPTIONS.find(({ value }) => value === interval);
    }
  } else if (intervalNoteLen === 5) {
    // 五度音
    if (!answer) {
      answer = FIVE_TONE_OPTIONS.find(({ value }) => value === interval);
    }
  }
  return answer;
}

/** 获取答案选项 */
export function getAnswerOptions(answer?: { label: string; value: number }) {
  if (answer) {
    const optionsList = [
      ...TONE_OPTIONS,
      ...FOUR_TONE_OPTIONS,
      ...FIVE_TONE_OPTIONS,
    ].sort((a, b) => {
      return a.value - b.value;
    });
    const answerIndex = optionsList.findIndex(({ label }) => {
      return answer.label === label;
    });
    let options: { label: string; value: number }[] = [];
    if (answerIndex > optionsList.length - 2) {
      // 如果是最后一个元素的话
      options = [...optionsList.slice(answerIndex - 1), optionsList[0]];
    } else if (answerIndex === 0) {
      options = optionsList.slice(answerIndex, answerIndex + 3);
    } else {
      options = optionsList.slice(answerIndex - 1, answerIndex + 2);
    }
    return options;
  }
  return [];
}

/** 创建音程问题 */
export function createIntervalQuestion(level = LevelType.junior) {
  const noteLen = NOTE_LIST.length;
  // 初级
  if (level === LevelType.junior) {
    let firstNoteIndex = getRandomIndex(noteLen);
    const firstNote = NOTE_LIST[firstNoteIndex];
    let secondNoteIndex = getRandomIndex(noteLen);
    const secondNote = NOTE_LIST[secondNoteIndex];
    let intervalNoteList = [firstNote];
    let intervalList = [0];
    while (firstNoteIndex !== secondNoteIndex) {
      intervalList.push(INTERVAL_LIST[firstNoteIndex]);
      // 如果到最后一个了，则重头开始
      if (firstNoteIndex === noteLen - 1) {
        firstNoteIndex = 0;
      } else {
        firstNoteIndex++;
      }
      intervalNoteList.push(NOTE_LIST[firstNoteIndex]);
    }

    const interval = intervalList.reduce((res, cur) => {
      res += cur;
      return res;
    }, 0);

    const answer = getAnswer(intervalNoteList, interval);

    return {
      firstNote,
      secondNote,
      answer,
      intervalNoteList,
      options: shuffleArray(getAnswerOptions(answer)),
    };
  }
}
