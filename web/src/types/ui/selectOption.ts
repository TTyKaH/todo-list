export interface SelectOption {
  // TODO: Как описать тип, в котором структура может отличаться, например кастомный селект будет выводить не поле text, а поле label
  id: number;
  value: string | number;
}
