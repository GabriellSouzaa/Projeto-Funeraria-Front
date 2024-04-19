import { FormControl } from "@angular/forms";

export class Login {

  public email!: FormControl<string | null>;;
  public senha!: FormControl<string | null>;
}
