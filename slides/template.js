import { createElement } from 'react';


import { FlexBox, FullScreen, Progress, Box } from 'spectacle';

const template = () =>
  createElement(
    FlexBox,
    {
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: 0,
      width: 1
    },
    [
      createElement(
        "img",
        {
          src: "",
          style: {
            width: 108,
            height: 60,
            padding: 20,
          }
        },
      ),
      createElement(
        Box,
        { padding: 10, key: 'fullscreen-templ' },
        createElement(FullScreen)
      )
    ]
  );

export default template;
