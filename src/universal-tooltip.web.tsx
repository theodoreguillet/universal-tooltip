import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";
import React, { useMemo, Fragment, createContext, useContext } from "react";
import { Text as RNText, View } from "react-native";

import {
  ContentProps,
  RootProps,
  TextProps,
  TriggerProps,
} from "./universal-tooltip.types";
import "./styles.css";
import { pickChild } from "./utils/pick-child";

export const TooltipContext = createContext<{ usePopover: boolean }>({
  usePopover: false,
});

export const Trigger = ({ children, ...rest }: TriggerProps) => {
  const { usePopover } = useContext(TooltipContext);

  const TooltipTrigger = usePopover ? Popover.Trigger : Tooltip.Trigger;

  return (
    <TooltipTrigger asChild {...rest}>
      <div>{children}</div>
    </TooltipTrigger>
  );
};
export const Root = ({
  children,
  onDismiss,
  open,
  usePopover = false,
  ...rest
}: RootProps) => {
  const TooltipProvider = usePopover ? Fragment : Tooltip.Provider;
  const TooltipRoot = usePopover ? Popover.Root : Tooltip.Root;

  return (
    <TooltipContext.Provider value={{ usePopover }}>
      <TooltipProvider>
        <TooltipRoot
          onOpenChange={(state) => {
            if (open === undefined && state === false) {
              onDismiss?.();
            }
          }}
          open={open}
          {...rest}
        >
          {children}
        </TooltipRoot>
      </TooltipProvider>
    </TooltipContext.Provider>
  );
};

export const Content = ({ children, ...rest }: ContentProps) => {
  const {
    side,
    dismissDuration,
    containerStyle,
    presetAnimation,
    backgroundColor,
    borderRadius,
    onTap,
    className,
    disableTapToDismiss,
    maxWidth,
    ...restProps
  } = rest;
  const { usePopover } = useContext(TooltipContext);
  const [, triggerChildren] = pickChild(children, Text);
  const TooltipContent = usePopover ? Popover.Content : Tooltip.Content;
  const TooltipPortal = usePopover ? Popover.Portal : Tooltip.Portal;
  const TooltipArrow = usePopover ? Popover.Arrow : Tooltip.Arrow;

  const animationClass = useMemo(() => {
    switch (presetAnimation) {
      case "fadeIn":
        return `tooltip-fade-in-${side ?? "top"}`;
      case "zoomIn":
        return "tooltip-zoom-in";
      default:
        return "";
    }
  }, [presetAnimation]);

  return (
    <TooltipPortal>
      <TooltipContent
        side={side}
        className={`${animationClass} ${className}`}
        onClick={onTap}
        {...restProps}
      >
        <View
          style={[
            (triggerChildren as any)?.length > 0
              ? { backgroundColor, borderRadius, maxWidth, ...containerStyle }
              : {},
          ]}
        >
          {children}
        </View>

        <TooltipArrow fill={backgroundColor ?? "#000"} />
      </TooltipContent>
    </TooltipPortal>
  );
};
export const Text = ({
  style,
  textColor,
  textSize,
  fontWeight,
  text,
  ...rest
}: TextProps) => {
  return (
    <RNText
      style={[style, { color: textColor, fontSize: textSize, fontWeight }]}
      {...rest}
    >
      {text}
    </RNText>
  );
};
