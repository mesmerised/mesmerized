import React from 'react';
import FontIcon from 'react-toolbox/lib/font_icon/FontIcon';
import { toUrl } from '@utils/url.utils';
import apiConfigs from '../../configs/api.config';
import './style.css';

const attributionConfigs = apiConfigs.attribution;
const { baseUrl, utm } = attributionConfigs;
const serviceLink = toUrl(baseUrl, utm);

const Credits = ({ meta = {} }) => {
    const { user, links = {} } = meta;
    if (!user) return null;

    const { html } = links;
    const icon = <FontIcon className="attribution__icon" value="photo" />;
    const iconLink = html ?
        <a className="attribution__item" href={ toUrl(html, utm) }>{ icon }</a>
        : icon;

    const { name, username } = user;
    const userLink = toUrl(`${baseUrl}/@${username}`, utm);

    return (
        <div className="attribution">
            { iconLink }
            <a className="attribution__item" href={ userLink }>{ name }</a>
            <span className="attribution__item">/</span>
            <a className="attribution__item" href={ serviceLink }>Unsplash</a>
        </div>
    );
};

export default Credits;
