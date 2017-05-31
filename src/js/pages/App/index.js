import React, { Component } from 'react';
import style from './index.scss';

class App extends Component {
	render() {
		return (
			<main className={style.html}>
				<div className={style.body}>
					<div className={style.site}>
						<div className={style.main}>
							{ this.props.children }
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default App
