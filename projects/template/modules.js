
const mcarousel = {
  frame : 'screen', // screen, mobile, desktop
  media : [ ],
};

const mshowcase = {
  frame : 'screen', // screen, mobile, desktop
  media : [ ],
};

const mparagraph = {
  title : '',
  src   : 'content',   // content, technologies
  ref   : '',
};

export function carousel(opts = { }) {
  return { ...mcarousel, ...opts, type: 'carousel' };
}

export function showcase(opts = { }) {
  return { ...mshowcase, ...opts, type: 'showcase' };
}

export function paragraph(opts = { }) {
  return { ...mparagraph, ...opts, type: 'paragraph' };
}
