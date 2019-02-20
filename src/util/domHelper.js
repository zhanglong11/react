const getOffset_ = prop => dom => dom[`offset${prop}`];

export const getOffsetX = getOffset_('Left');
export const getOffsetY = getOffset_('Top');
export const getOffsetParent = getOffset_('Parent');

const computeOffset_  = prop => dom => {
    let getOffset = getOffset_(prop);
    let offset = 0;
    while (dom) {
        offset += getOffset(dom);
        dom = getOffsetParent(dom);
    }

    return offset;
}

export const computeOffsetX = computeOffset_('Left');
export const computeOffsetY = computeOffset_('Top');
