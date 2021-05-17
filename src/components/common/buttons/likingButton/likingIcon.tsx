import React from 'react';
import { LikeTypes } from '.';
import {
	ThumbDown,
	ThumbDownOutlined,
	ThumbUp,
	ThumbUpOutlined,
} from '@material-ui/icons';

interface Props {
	size: number;
	type: LikeTypes;
	hovering: boolean;
	userActioned: boolean | undefined;
	comment?: boolean;
}

const LikingIcon: React.FC<Props> = ({
	size,
	type,
	hovering,
	userActioned,
	comment,
}) =>
	type === LikeTypes.LIKE ? (
		hovering || userActioned || comment ? (
			<ThumbUp style={{ fontSize: size }} />
		) : (
			<ThumbUpOutlined style={{ fontSize: size }} />
		)
	) : hovering || userActioned || comment ? (
		<ThumbDown style={{ fontSize: size }} />
	) : (
		<ThumbDownOutlined style={{ fontSize: size }} />
	);

export default LikingIcon;
