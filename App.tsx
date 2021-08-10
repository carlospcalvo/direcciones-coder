import React, { FC } from 'react';
import { Provider } from 'react-redux'
import store from './store'
import { init } from './db';
import MainNavigator from './navigation'

init()
.then(() => console.log('Database initialized'))
.catch((err) => console.log('Database failed to connect: ', err));

const App: FC = () => {
    return (
        <Provider store={store}>
            <MainNavigator />
        </Provider>
    );
}

export default App;
