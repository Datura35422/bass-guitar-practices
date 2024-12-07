import { getRandomIndex, shuffleArray } from "./random";
import {
  TONE_OPTIONS,
  FOUR_TONE_OPTIONS,
  FIVE_TONE_OPTIONS,
  INTERVAL_LIST,
  NOTE_LIST,
  OperateSemitone,
  SEMITONE_SYMBOL,
} from "../constants/interval";

/** 获取完整的音列表，传入的降音或升音处理则每个音之间间隔半音 */
export function getAllNote(semitone?: OperateSemitone) {
  if (semitone === OperateSemitone.flat) {
    return NOTE_LIST.flatMap((item) => {
      //  特殊处理 C F，降C就是B，降F就是E
      if (['c', 'F'].includes(item)) {
        return [item];
      }
      return [`${item}${SEMITONE_SYMBOL[semitone]}`,item];
    });
  } else if (semitone === OperateSemitone.sharp) {
    return NOTE_LIST.flatMap((item) => {
      // 特殊处理 B E，升B就是C，升E就是F
      if (['B', 'F'].includes(item)) {
        return [item];
      }
      return [`${item}${SEMITONE_SYMBOL[semitone]}`,item];
    });
  }
  return NOTE_LIST;
};

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

/** 创建音程问题 - 几度音 */
export function createIntervalToneQuestion(noteList = NOTE_LIST) {
  const noteLen = noteList.length;
  let firstNoteIndex = getRandomIndex(noteLen);
  const firstNote = noteList[firstNoteIndex];
  let secondNoteIndex = getRandomIndex(noteLen);
  const secondNote = noteList[secondNoteIndex];
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
    intervalNoteList.push(noteList[firstNoteIndex]);
  }

  const interval = intervalList.reduce((res, cur) => {
    res += cur;
    return res;
  }, 0);

  const answer = getAnswer(intervalNoteList, interval);

  // secondNote 是 firstNote 的几度音
  return {
    question: `${secondNote} 是 ${firstNote} 的几度音？`,
    answer,
    options: shuffleArray(getAnswerOptions(answer)),
  };
}

/** 创建音程问题 - 计算音程得到音 */
export function createDegreeNoteQuestion(intervel: number) {
  const noteLen = NOTE_LIST.length;
  let questionNoteIndex = getRandomIndex(noteLen);
  const questionNote = NOTE_LIST[questionNoteIndex];
  // 先统一用降半调的方式处理，获取所有音和半音列表，每个音之间的间隔为半音
  const allNoteList = getAllNote(OperateSemitone.flat);
  const currentQuestionNoteIndex = allNoteList.findIndex((item) => item === questionNote);
  // 音数处理成半音的距离
  const gap = Math.floor(intervel / 0.5);
  const answerIndex = currentQuestionNoteIndex + gap;
  const answerNote = [...allNoteList, ...allNoteList][answerIndex];

  const intervalText = TONE_OPTIONS.find(({value}) => value === intervel)?.label;
  const answerOptions = [...allNoteList, ...allNoteList].slice(answerIndex - 1, answerIndex + 2).map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  return {
    answer: {label: answerNote, value: answerNote},
    question: `${questionNote} 的${intervalText}是`,
    options: shuffleArray(answerOptions),
  };
};

