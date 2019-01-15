import React, { Component } from 'react';

const withClass = (WrappedComponent: any, classes: string) => {
    return class extends Component<any, any> {
        render() {
            return (
                <div className={classes}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
};

export default withClass;