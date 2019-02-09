import { Component, OnInit} from '@angular/core';
import { ChainService } from '../services/chain.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chain-table',
  templateUrl: './chain-table.component.html',
  styleUrls: ['./chain-table.component.scss']
})
export class ChainTableComponent implements OnInit {
  chains = [];
  expirations = [];
  contractsByStrike = {
    calls: {},
    puts: {}
  };
  security = '';
  strikes = [];
  lastPrice = 0.0;

  constructor(private chainService: ChainService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.security = params['security'];

      if(this.security) {
        this.chainService.getAllChains(this.security).subscribe(chains => {
          console.log('Returned chains:', chains);
          this.chains = chains;
          this.convertExpirations();
          this.initContractsByStrike();
          console.log(this.contractsByStrike);
        });
      }
    });
  }

  initContractsByStrike() {
    for(const chain of this.chains) {
      this.lastPrice = chain.lastPrice;

      for(const call of chain.calls) {
        if(!this.withinPercent(this.lastPrice, 20, call.strike)) {
          continue;
        }

        if(!this.contractsByStrike.calls[call.strike]) {
          this.contractsByStrike.calls[call.strike] = {};
        }
        const contract = {
          bid: call.bid,
          ask: call.ask
        };
        this.contractsByStrike.calls[call.strike][chain.expiration] = contract;
      }
      for(const put of chain.puts) {
        if(!this.withinPercent(this.lastPrice, 20, put.strike)) {
          continue;
        }

        if(!this.contractsByStrike.puts[put.strike]) {
          this.contractsByStrike.puts[put.strike] = {};
        }
        const contract = {
          bid: put.bid,
          ask: put.ask
        };
        this.contractsByStrike.puts[put.strike][chain.expiration] = contract;
      }
      this.strikes = Object.keys(this.contractsByStrike.calls).sort();
    }
  }
  convertExpirations() {
    this.expirations = [];
    for(const chain of this.chains) {
      const date = new Date(chain.expiration * 1000);
      let dateStr = (date.getMonth()  + 1) + '/' + date.getDate() + '/' + date.getFullYear();
      this.expirations.push(dateStr);
    }
  }

  withinPercent(underlying, percent, strike) {
    return (strike < underlying + underlying * (percent/100.0)) && (strike > underlying - underlying * (percent/100.0));
  }
}


