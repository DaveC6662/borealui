// scripts/utils/generateBaseTemplate.js
module.exports = function generateBaseTemplate(
  name,
  propsInterface = "ComponentProps"
) {
  return `import React from 'react';
  import { ${propsInterface} } from './${name}.types';
  
  interface ${name}BaseProps extends ${propsInterface} {
    classNames: {
      wrapper: string;
      [key: string]: string;
    };
    [key: string]: any;
  }
  
  const ${name}Base: React.FC<${name}BaseProps> = ({
    classNames,
    children,
    ...rest
  }) => {
    return (
      <div className={classNames.wrapper} {...rest}>
        {children}
      </div>
    );
  };
  
  export default ${name}Base;
  `;
};
