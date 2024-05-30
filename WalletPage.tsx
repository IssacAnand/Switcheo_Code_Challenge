import React, { useState,
    useEffect,
    useMemo,
} from 'react'; 

  /* 
  Incomplete

  Issues before reformatted code: 

  1. custom Hook(useWalletBalances) and Component (WalletRow) was being used.
    No such Hooks or Components were referenced or used

  2. The variable lhsPrioity was not declared and will cause runtime error

  3.Props interface extends BoxProps but BoxProps is never referenced

  
  */

interface WalletBalance {
    currency: string;
    amount: number;
  
  }
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
 

  interface Props {
  children?: React.ReactNode;
  [key: string]: any;
  
  }
  
  class Datasource {
    // TODO: Implement datasource class

    //declare var
    private url: string;

    //instantiating Datasource with URL
    constructor(url:string){
        this.url=url;
    }

    async getPrices():Promise<Record<string, number>> {
      //Try-catch block

      try{
        const response = await fetch(this.url);

        //if fetch was not successful
        if(!response.ok){
          throw new Error(`ERROR:${response.status}`)
        }

        const prices = await response.json();

        return prices;
      
      }

      //throw error if error during fetching
      catch(error){
        throw error;
      }
    }

  }
  
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
      const [prices, setPrices] = useState<Record<string, number>>({});
  
    useEffect(() => {
      const datasource = new Datasource("https://interview.switcheo.com/prices.json");
      datasource.getPrices().then((prices) => {
        setPrices(prices);
      }).catch((error) => {
        console.error(error);
      });
    }, []);
  
      const getPriority = (blockchain: any): number => {
        switch (blockchain) {
          case 'Osmosis': return 100;
          case 'Ethereum': return 50;
          case 'Arbitrum': return 30;
          case 'Zilliqa': return 20;
          case 'Neo': return 20;
          default: return -99;
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
              const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);
  
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow 
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }
