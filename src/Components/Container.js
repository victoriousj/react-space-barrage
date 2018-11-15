import React from 'react';

import { ContainerSC, SmStarSC, MdStarSC, LgStarSC } from './StyledComponents';

import Ship from './Ship';

class Container extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			stars: [],
		};
	}

	componentWillMount() {
		const newStars = [...this.state.stars];
		const random = () => Math.floor(Math.random() * window.innerWidth);

		for (var i = 0; i < 20; ++i) {
			newStars.push(
				<SmStarSC key={'a' + i} x={random()} sp={12} delay={i * 333} />,
				<MdStarSC key={'b' + i} x={random()} sp={9} delay={i * 333 + 333} />,
				<LgStarSC key={'c' + i} x={random()} sp={6} delay={i * 333 + 666} />
			);
		}

		this.setState({ stars: newStars });
	}

	render() {
		return (
			<ContainerSC>
				{this.state.stars}
				<Ship />
			</ContainerSC>
		);
	}
}
export default Container;
