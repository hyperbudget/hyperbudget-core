import snapshot from 'snap-shot-it';
import { ReportBusinessLogic } from '../src/lib/manager/reportmanager';
import { Category } from '../src/types/category';
import { RuleMatchMode } from '../src/lib/enums';
import { expect } from 'chai';

describe('Report Business Logic', () => {
  it('adds transactions from object', async () => {
    const records = [{
      txn_date: '2018-01-01T00:00:00Z',
      txn_amount_debit: 1000,
      txn_desc: 'Foobar',
      txn_type: 'DD',
      acc_sortcode: '01-02-03',
      acc_number: '12345678',
      acc_balance: 1050,
      txn_src: 'lloyds',
    }, {
      txn_date: '2018-08-15T00:00:00Z',
      txn_amount_debit: 0,
      txn_amount_credit: 2000,
      txn_desc: 'CELERY',
      txn_type: 'FPI',
      acc_sortcode: '01-02-03',
      acc_number: '12345678',
      acc_balance: 3050,
      txn_src: 'lloyds',
    }];

    const logic = new ReportBusinessLogic();
    const txns = await logic.addTransactionsFromObject(records);
    snapshot(txns);
  });

  it('categorises transactions', async () => {
    const categories: Category[] = [{
      "name": "Income",
      "category_rules": {
        "txn_amount_credit": {
          "mode": RuleMatchMode.Strict,
          "rules": [
            [">", 0]
          ]
        },
        "txn_desc": {
          "mode": RuleMatchMode.Strict,
          "rules": [
            ["!~", "J DOE"],
          ]
        }
      },
      "className": "cat-income",
      "id": "income"
    }, {
      "name": "Main Income",
      "category_rules": {
        "txn_amount_credit": {
          "rules": [
            [">", 1000]
          ]
        },
        "txn_desc": {
          "rules": [
            ["!~", "J DOE"],
          ]
        }
      },
      "className": "cat-income",
      "id": "main-income",
      "txn_month_modifier": 1
    }, {
      "name": "Expenditure",
      "category_rules": {
        "txn_amount_debit": {
          "rules": [
            [">", 0]
          ]
        },
        "txn_desc": {
          "rules": [
            ["!~", "J DOE"],
          ]
        }
      },
      "className": "cat-exp",
      "id": "exp"
    }, {
      "name": "Refunds",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "DEB"]
          ]
        },
        "txn_amount_credit": {
          "rules": [
            [">", 0]
          ]
        }
      },
      "className": "class-refunds",
      "id": "refunds"
    }, {
      "name": "Bills",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "DD"]
          ]
        }
      },
      "className": "cat-bills",
      "id": "bills"
    }, {
      "name": "Rent",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "SO"]
          ]
        }
      },
      "className": "cat-rent",
      "id": "rent"
    },
    {
      "name": "Rent: Bring back",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "SO"]
          ]
        },
        "txn_day": {
          "rules": [
            ["<", 15]
          ]
        }
      },
      "txn_month_modifier": -1,
      "className": "cat-rent",
      "id": "rent-bring-back",
      "hidden_on_cat_list": true,
      "hidden_on_txn_list": true
    }, {
      "name": "Bills - bring forward",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "DD"]
          ]
        },
        "txn_desc": {
          "mode": RuleMatchMode.Strict,
          "rules": [
            ["=~", "ELECTRICITY CORP INC"]
          ]
        },
        "txn_day": {
          "rules": [
            [">", 15]
          ]
        }
      },
      "txn_month_modifier": 1,
      "className": "cat-bills",
      "id": "bills-fwd",
      "hidden_on_cat_list": true,
      "hidden_on_txn_list": true
    }, {
      "name": "Cash Withdrawals",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "CPT"]
          ]
        }
      },
      "className": "cat-cpt",
      "id": "cpt"
    }, {
      "name": "Personal Bank Transfers",
      "category_rules": {
        "txn_desc": {
          "rules": [
            ["=~", "J DOE"]
          ]
        }
      },
      "className": "cat-tfr-pers",
      "id": "tfr-pers",
      "hidden_on_running_total": true
    }];
    const records = [
      {
        txn_date            : '01/01/2017',
        txn_type            : 'FPO',
        txn_desc            : 'TFR J DOE',
        txn_amount_credit   : 0,
        txn_amount_debit    : 2000,
      },
      {
        txn_date: '01/01/2017',
        txn_type: 'DD',
        txn_desc: 'ELECTRICITY CORP INC',
        txn_amount_debit: 80.12,
        txn_amount_credit: 0,
      },
      ({
        txn_date: '31/01/2017',
        txn_type: 'DD',
        txn_desc: 'ELECTRICITY CORP INC',
        txn_amount_debit: 75.24,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '31/01/2017',
        txn_type: 'CPT',
        txn_desc: 'LNK 10 DWNG STR LNDN GB',
        txn_amount_debit:  0,
        txn_amount_credit: 100,
      }),
      ({
        txn_date: '16/01/2017',
        txn_type: 'DD',
        txn_desc: 'INTERNET',
        txn_amount_debit: 34.99,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '29/01/2017',
        txn_type: 'SO',
        txn_desc: 'LANDLORD CORP',
        txn_amount_debit: 500.00,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '20/01/2017',
        txn_type: 'DEB',
        txn_desc: 'PEAR COMPUTERS INC',
        txn_amount_debit: 999.99,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '31/12/2016',
        txn_type: 'FPI',
        txn_desc: 'MEGACORP SALARY',
        txn_amount_debit: 0,
        txn_amount_credit: 1500,
      }),
      ({
        txn_date: '31/12/2017',
        txn_type: 'FPI',
        txn_desc: 'EBAY SALES',
        txn_amount_debit: 0,
        txn_amount_credit: 50,
      }),
    ];

    const logic = new ReportBusinessLogic();
    await logic.addTransactionsFromObject(records);

    snapshot(await logic.categoriseTransactions(categories));
  });
  it('filters transactions', async () => {
    const categories: Category[] = [{
      "name": "Income",
      "category_rules": {
        "txn_amount_credit": {
          "mode": RuleMatchMode.Strict,
          "rules": [
            [">", 0]
          ]
        },
        "txn_desc": {
          "mode": RuleMatchMode.Strict,
          "rules": [
            ["!~", "J DOE"],
          ]
        }
      },
      "className": "cat-income",
      "id": "income"
    }, {
      "name": "Main Income",
      "category_rules": {
        "txn_amount_credit": {
          "rules": [
            [">", 1000]
          ]
        },
        "txn_desc": {
          "rules": [
            ["!~", "J DOE"],
          ]
        }
      },
      "className": "cat-income",
      "id": "main-income",
      "txn_month_modifier": 1
    }, {
      "name": "Expenditure",
      "category_rules": {
        "txn_amount_debit": {
          "rules": [
            [">", 0]
          ]
        },
        "txn_desc": {
          "rules": [
            ["!~", "J DOE"],
          ]
        }
      },
      "className": "cat-exp",
      "id": "exp"
    }, {
      "name": "Refunds",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "DEB"]
          ]
        },
        "txn_amount_credit": {
          "rules": [
            [">", 0]
          ]
        }
      },
      "className": "class-refunds",
      "id": "refunds"
    }, {
      "name": "Bills",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "DD"]
          ]
        }
      },
      "className": "cat-bills",
      "id": "bills"
    }, {
      "name": "Rent",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "SO"]
          ]
        }
      },
      "className": "cat-rent",
      "id": "rent"
    },
    {
      "name": "Rent: Bring back",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "SO"]
          ]
        },
        "txn_day": {
          "rules": [
            ["<", 15]
          ]
        }
      },
      "txn_month_modifier": -1,
      "className": "cat-rent",
      "id": "rent-bring-back",
      "hidden_on_cat_list": true,
      "hidden_on_txn_list": true
    }, {
      "name": "Bills - bring forward",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "DD"]
          ]
        },
        "txn_desc": {
          "mode": RuleMatchMode.Strict,
          "rules": [
            ["=~", "ELECTRICITY CORP INC"]
          ]
        },
        "txn_day": {
          "rules": [
            [">", 15]
          ]
        }
      },
      "txn_month_modifier": 1,
      "className": "cat-bills",
      "id": "bills-fwd",
      "hidden_on_cat_list": true,
      "hidden_on_txn_list": true
    }, {
      "name": "Cash Withdrawals",
      "category_rules": {
        "txn_type": {
          "rules": [
            ["=", "CPT"]
          ]
        }
      },
      "className": "cat-cpt",
      "id": "cpt"
    }, {
      "name": "Personal Bank Transfers",
      "category_rules": {
        "txn_desc": {
          "rules": [
            ["=~", "J DOE"]
          ]
        }
      },
      "className": "cat-tfr-pers",
      "id": "tfr-pers",
      "hidden_on_running_total": true
    }];
    const records = [
      {
        txn_date            : '01/01/2017',
        txn_type            : 'FPO',
        txn_desc            : 'TFR J DOE',
        txn_amount_credit   : 0,
        txn_amount_debit    : 2000,
      },
      {
        txn_date: '01/01/2017',
        txn_type: 'DD',
        txn_desc: 'ELECTRICITY CORP INC',
        txn_amount_debit: 80.12,
        txn_amount_credit: 0,
      },
      ({
        txn_date: '31/01/2017',
        txn_type: 'DD',
        txn_desc: 'ELECTRICITY CORP INC',
        txn_amount_debit: 75.24,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '31/01/2017',
        txn_type: 'CPT',
        txn_desc: 'LNK 10 DWNG STR LNDN GB',
        txn_amount_debit:  0,
        txn_amount_credit: 100,
      }),
      ({
        txn_date: '16/01/2017',
        txn_type: 'DD',
        txn_desc: 'INTERNET',
        txn_amount_debit: 34.99,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '29/01/2017',
        txn_type: 'SO',
        txn_desc: 'LANDLORD CORP',
        txn_amount_debit: 500.00,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '20/01/2017',
        txn_type: 'DEB',
        txn_desc: 'PEAR COMPUTERS INC',
        txn_amount_debit: 999.99,
        txn_amount_credit: 0,
      }),
      ({
        txn_date: '31/12/2016',
        txn_type: 'FPI',
        txn_desc: 'MEGACORP SALARY',
        txn_amount_debit: 0,
        txn_amount_credit: 1500,
      }),
      ({
        txn_date: '31/12/2017',
        txn_type: 'FPI',
        txn_desc: 'EBAY SALES',
        txn_amount_debit: 0,
        txn_amount_credit: 50,
      }),
    ];

    const logic = new ReportBusinessLogic();
    await logic.addTransactionsFromObject(records);

    await logic.categoriseTransactions(categories);

    snapshot(logic.filterTransactionsByMonth('201701'));
    snapshot(logic.filterTransactionsByMonth('201702'));
    snapshot(logic.filterTransactionsByMonth('201712'));
  });
})
