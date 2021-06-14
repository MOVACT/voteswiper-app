/**
 * https://github.com/tabler/tabler-icons
 *
 * MIT License

  Copyright (c) 2020 Paweł Kuna

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
 */
import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

const Polaroid: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}>
      <Path d="M0 0h24v24H0z" stroke="none" />
      <Rect x={4} y={4} width={16} height={16} rx={2} />
      <Path d="M4 16h16M4 12l3-3c.928-.893 2.072-.893 3 0l4 4" />
      <Path d="M13 12l2-2c.928-.893 2.072-.893 3 0l2 2M14 7h.01" />
    </Svg>
  );
};

export default Polaroid;
