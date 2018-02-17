import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import requestHandler from '../../api/remote';
import Hotel from './Hotel';

class HotelLists extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hotels: []
        }
    }

    componentDidMount() {

        // requestHandler.getAllHotels().then(data => {
        //
        //     if (data) {
        //         this.setState({hotels: data});
        //     }
        // })
        this.getHotelsFromServer();

    }

    // FOR PAGINATION
    componentWillReceiveProps(nextProps) {

        if (nextProps.page !== this.props.page) {
            this.getHotelsFromServer(Number(nextProps.page));
        }
    }

    getHotelsFromServer(page) {

        requestHandler.getAllHotelsByPage(page || this.props.page).then(data => {

            if (data) {
                this.setState({hotels: data});
            }
        })
    }

    render() {
        const page = this.props.page;

        if (sessionStorage.getItem('authToken')) {
            return (
                <section>
                    <div>
                        {this.state.hotels.map(hotel => {
                            return <Hotel
                                key={hotel.id}
                                props={hotel}
                            />
                        })}
                        }
                    </div>
                    <div>
                        {page > 1 && <Link to={'/view/' + (page - 1)}>&lt;</Link>}
                        <Link to={'/view/' + (page + 1)}>&gt;</Link>
                    </div>
                </section>
            )
        } else {
            return (
                <section>
                    <div>Not logged in!</div>
                </section>
            )
        }
    }
}

export default HotelLists;