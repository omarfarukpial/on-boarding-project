export interface SelectedValue {
  name?: String;
  id?: number;
}

export interface Filter {
  id: number;
  name: String;
  load_on_init: boolean;
  values: Object[];
  selectedValue?: SelectedValue;
}