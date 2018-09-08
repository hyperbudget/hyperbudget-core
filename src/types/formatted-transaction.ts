import { Category } from "./category";

/* A formatted version of Transaction for displaying stuff on the frontend only.
* Numbers here are stringified, so you shouldn't add them
Also, this gives 2 new members: cat_class (which is the classnames for the categories, and category_names which don't include hidden categories.
*/

export type FormattedTransaction = {
  type: string;
  description: string;
  source: string;

  cat_class: string;
  category_names: string;
  categories: Category[],

  creditAmount:  number;
  debitAmount:  number;
  accountBalance:  number;

  creditAmount_str:  string;
  debitAmount_str:  string;
  accountBalance_str:  string;

  date: string;
  running_total_spend: string;
}
