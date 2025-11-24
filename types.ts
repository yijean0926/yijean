export enum AnimationMode {
  STATIC = 'static',
  ZIGZAG = 'zigzag',
  JUMP = 'jump',
  WAVE = 'wave'
}

export interface FontConfig {
  id: string;
  name: string;
  family: string;
  defaultText: string;
  styleClass: string;
}