module.exports = [
  {
    latex: `\\begin{aligned}\\frac{\\partial f}{\\partial \\boldsymbol{A}}: \\boldsymbol{T} &=\\left.\\frac{d}{d \\alpha}\\left[\\alpha^{3} \\operatorname{det}(\\boldsymbol{A})\\left(\\frac{1}{\\alpha^{3}}+I_{1}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\frac{1}{\\alpha^{2}}+I_{2}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\frac{1}{\\alpha}+I_{3}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right)\\right)\\right]\\right|_{0} \\\\&=\\left.\\operatorname{det}(\\boldsymbol{A}) \\frac{d}{d \\alpha}\\left[1+I_{1}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\alpha+I_{2}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\alpha^{2}+I_{3}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\alpha^{3}\\right]\\right|_{a-0} \\\\&=\\left.\\operatorname{det}(\\boldsymbol{A})\\left[I_{1}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right)+2 I_{2}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\alpha+3 I_{3}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right) \\alpha^{2}\\right]\\right|_{\\alpha=0} \\\\&=\\operatorname{det}(\\boldsymbol{A}) I_{1}\\left(\\boldsymbol{A}^{-1} \\cdot \\boldsymbol{T}\\right)\\end{aligned}`,
    ascii:  `[(del f)/(del A):T,={:(d)/(d alpha)[alpha^(3)det⁡(A)((1)/(alpha^(3))+I_(1)(A^(−1)*T)(1)/(alpha^(2))+I_(2)(A^(−1)*T)(1)/(alpha)+I_(3)(A^(−1)*T))]|_(0)],[,={: det⁡(A)(d)/(d alpha)[1+I_(1)(A^(−1)*T)alpha+I_(2)(A^(−1)*T)alpha^(2)+I_(3)(A^(−1)*T)alpha^(3)]|_(a−0)],[,={: det⁡(A)[I_(1)(A^(−1)*T)+2I_(2)(A^(−1)*T)alpha+3I_(3)(A^(−1)*T)alpha^(2)]|_(alpha=0)],[,=det⁡(A)I_(1)(A^(−1)*T)]`,
  }
];
