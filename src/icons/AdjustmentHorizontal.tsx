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
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

const AdjustmentHorizontal: React.FC<SvgProps> = (props) => {
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
      <Circle cx={14} cy={6} r={2} />
      <Path d="M4 6h8M16 6h4" />
      <Circle cx={8} cy={12} r={2} />
      <Path d="M4 12h2M10 12h10" />
      <Circle cx={17} cy={18} r={2} />
      <Path d="M4 18h11M19 18h1" />
    </Svg>
  );
};

export default AdjustmentHorizontal;
