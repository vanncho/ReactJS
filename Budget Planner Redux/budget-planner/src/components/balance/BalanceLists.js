import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import requestHandler from '../../api/remote';
import Balance from "./Balance";

class BalanceLists extends Component {

    constructor(props) {
        super(props);

        this.state = {
            balance: {},
            thisYear: 0
        }
    }

    componentDidMount() {

        this.getBalanceByYear();
    }

    getBalanceByYear() {

        let currentTime = new Date();
        let thisYear = (currentTime.getFullYear());
        this.setState({thisYear: thisYear});

        if (sessionStorage.getItem('authToken')) {

            requestHandler.getBalanceByYear(thisYear).then(data => {

                if (data) {
                    this.setState({balance: data});
                }
            })
        } else {
            this.props.history.push("/login");
        }
    }

    render() {

        if (sessionStorage.getItem('authToken')) {
            return (
                <main>
                    <div className="container">
                        <div className="row space-top">
                            <div className="col-md-12">
                                <h1>Yearly Balance</h1>
                            </div>
                        </div>
                        <div className="row space-top col-md-12">

                            {Object.keys(this.state.balance).map((b, i) => {
                                return <Balance
                                    key={i}
                                    id={i + 1}
                                    year={this.state.thisYear}
                                    balance={this.state.balance[Number(b)].balance}
                                    budget={this.state.balance[Number(b)].budget}
                                />
                            })}
                        </div>
                    </div>
                 </main>
            )
        } else {
            return (
                <section>
                    <div>You are not authorized!</div>
                </section>
            )
        }
    }
}

export default withRouter(BalanceLists);