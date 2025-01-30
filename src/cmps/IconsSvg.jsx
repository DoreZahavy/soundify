import React from 'react';

export function IconsSvg({ svgName }) {
    const svgs = {
        play: (<svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" class="Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"/></svg>),
        search: '<svg>...</svg>',
        user: '<svg>...</svg>',
        // Add more SVGs here
    };

    const Icon = svgs[svgName];

    return Icon || <div>SVG not found</div>;
};

