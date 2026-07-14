'use client';

import { Icon } from '@/components/icons/icon';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import textSize from '@/lib/functions/textSize';

interface FilterBarProps<T> {
  selectedValues: Set<T>,
  values: readonly T[],
  paramName: string,
  display?: (t: T) => string,
}

export function filterIfAny<T, V>(values: V[], typeFromValue: (v: V) => T, selectedTypes: Set<T>): V[] {
  return selectedTypes.size === 0 ? values : values.filter(v => selectedTypes.has(typeFromValue(v)))
}

export function FilterBar<V extends string>({ selectedValues, values, paramName, display = (v: V) => v }: FilterBarProps<V>) {
  const params = new URLSearchParams(useSearchParams());
  const { replace } = useRouter();
  const pathname = usePathname();

  function onToggle(type: V) {
    if (selectedValues.has(type)) params.delete(paramName, type);
    else params.append(paramName, type);
    replace(pathname + "?" + params.toString());
  }

  const PAD_Y_CLASS = "py-1";
  const TEXT_CLASS = "text-sm";
  const BORDER_CLASS = "border";
  const RESET_HEIGHT_CLASS = "h-5";

  const borderDash = BORDER_CLASS.indexOf("-");
  const BASE_HEIGHT = 8*Number(PAD_Y_CLASS.substring(PAD_Y_CLASS.indexOf("-")+1))
      + 2*(borderDash === -1 ? 1 : Number(BORDER_CLASS.substring(borderDash+1)));
  const SINGLE_HEIGHT = BASE_HEIGHT + textSize(TEXT_CLASS);
  const FIRST_HEIGHT = BASE_HEIGHT + Math.max(textSize(TEXT_CLASS), Number(RESET_HEIGHT_CLASS.substring(RESET_HEIGHT_CLASS.indexOf("-")))*4);
  
  const containerClass = (emphasized: boolean, always: string) => `rounded-full ${BORDER_CLASS} ${PAD_Y_CLASS} ${always} ${
          emphasized
            ? 'bg-muted-primary/50 border-primary/30 dark:border-primary/60 text-primary dark:text-white theme-trans'
            : 'bg-muted-background border-border text-muted-foreground hover:border-border-glow theme-trans'
      }`;

  const GAP_CLASS = "gap-2";
  const GAP = Number(GAP_CLASS.substring(GAP_CLASS.indexOf("-")+1));

  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkOverflow = () => {
      setIsOverflowing(container.scrollHeight > FIRST_HEIGHT);
    };

    checkOverflow();

    const observer = new ResizeObserver(checkOverflow);
    observer.observe(container);

    return () => observer.disconnect();
  }, [containerRef.current?.scrollHeight]);

  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="flex flex-row items-start gap-2">
      <div 
        ref={containerRef}
        className={`flex flex-wrap ${GAP_CLASS} overflow-hidden transition-[max-height] ease-in-out`}
        style={{ 
          maxHeight: `${expanded ? containerRef.current?.scrollHeight || FIRST_HEIGHT : FIRST_HEIGHT}px`,
          transitionDuration: `${Math.round(((containerRef.current?.scrollHeight || FIRST_HEIGHT+SINGLE_HEIGHT+GAP) - FIRST_HEIGHT)/(SINGLE_HEIGHT+GAP)*200)}ms`
        }}
      >
        <button 
          onClick={() => {
            params.delete(paramName);
            replace(pathname + "?" + params.toString());
          }}
          className={containerClass(selectedValues.size > 0, `px-1`)}
        >
          <Icon icon="reset" className={`w-5 ${RESET_HEIGHT_CLASS}`}/>
        </button>

        {values.map(val => (
          <button
            key={val}
            type="button"
            onClick={() => onToggle(val)}
            className={containerClass(selectedValues.has(val), `px-3 ${TEXT_CLASS}`)}
          >
            {display(val)}
          </button>
        ))}
      </div>

      {isOverflowing && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="hover:scale-110 text-foreground theme-trans p-1 shrink-0"
        >
          <Icon icon="vertical-arrow" state={expanded}></Icon>
        </button>
      )}
    </div>
  );
}
