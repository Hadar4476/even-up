import { icons } from "@/theme/icons";
import SVG, { Props as ReactInlineSvgProps } from "react-inlinesvg";

type AppIconProps = ReactInlineSvgProps & {
  src: keyof typeof icons;
  onClick?: () => void;
};

export const AppIcon = ({ src, ...props }: AppIconProps) => {
  return (
    <SVG
      src={icons[src]}
      width={props.width ?? 16}
      height={props.width ?? 16}
      {...props}
    />
  );
};
