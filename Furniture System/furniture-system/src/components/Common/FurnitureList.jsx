import React, { Component } from 'react';

import FurnitureCard from './FurnitureCard';

class FurnitureList extends Component {

    render() {
        const { furniture } = this.props;

        return(
            <div className="row space-top">

                { furniture.map(f => {
                    return(<FurnitureCard
                        key={f.id}
                        image={f.image}
                        make={f.make}
                        model={f.model}
                        price={f.price}
                        id={f.id}
                    />)
                })}

            </div>
        )
    }
}

export default FurnitureList;