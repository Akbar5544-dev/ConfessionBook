import Svg, { Circle, Path } from 'react-native-svg';

type IconName =
    | 'arrow'
    | 'back'
    | 'bookmark'
    | 'chat'
    | 'check'
    | 'face'
    | 'heart'
    | 'home'
    | 'image'
    | 'location'
    | 'more'
    | 'plus'
    | 'search'
    | 'share'
    | 'sparkle'
    | 'sun'
    | 'thumbDown'
    | 'thumbUp';

type AppIconProps = {
    color?: string;
    name: IconName;
    size?: number;
    strokeWidth?: number;
};

const AppIcon = ({
    color = '#929D9E',
    name,
    size = 22,
    strokeWidth = 1.8,
}: AppIconProps) => {
    const common = {
        fill: 'none' as const,
        stroke: color,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        strokeWidth,
    };

    const shapes = {
        arrow: (
            <Path d="M5 12h14m-6-6 6 6-6 6" {...common} />
        ),
        back: <Path d="m14 5-7 7 7 7M7 12h13" {...common} />,
        bookmark: (
            <Path d="M7 4.75h10a1 1 0 0 1 1 1v14L12 16l-6 3.75v-14a1 1 0 0 1 1-1Z" {...common} />
        ),
        chat: (
            <Path d="M4.5 5.5h15v12h-9l-5 3v-15Z" {...common} />
        ),
        check: <Path d="m5 12 4.5 4.5L19 7" {...common} />,
        face: (
            <>
                <Circle cx="12" cy="12" r="9" {...common} />
                <Path d="M8.5 14.5c1.8 2 5.2 2 7 0M9 10h.01M15 10h.01" {...common} />
            </>
        ),
        heart: (
            <Path d="M20.2 8.8c0 4.2-8.2 10-8.2 10S3.8 13 3.8 8.8a4.1 4.1 0 0 1 7.4-2.4l.8 1 .8-1a4.1 4.1 0 0 1 7.4 2.4Z" {...common} />
        ),
        home: (
            <Path d="m3.5 10 8.5-7 8.5 7v10.5h-6v-7h-5v7h-6V10Z" {...common} />
        ),
        image: (
            <>
                <Path d="M4 4h16v16H4z" {...common} />
                <Circle cx="9" cy="9" r="1.5" {...common} />
                <Path d="m5 17 5-5 3 3 2-2 4 4" {...common} />
            </>
        ),
        location: (
            <>
                <Path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" {...common} />
                <Circle cx="12" cy="10" r="2" {...common} />
            </>
        ),
        more: (
            <>
                <Circle cx="5" cy="12" r="1" fill={color} />
                <Circle cx="12" cy="12" r="1" fill={color} />
                <Circle cx="19" cy="12" r="1" fill={color} />
            </>
        ),
        plus: (
            <Path d="M12 5v14M5 12h14" {...common} />
        ),
        search: (
            <>
                <Circle cx="10.8" cy="10.8" r="7" {...common} />
                <Path d="m16 16 4.5 4.5" {...common} />
            </>
        ),
        share: (
            <>
                <Circle cx="18" cy="5" r="2.5" {...common} />
                <Circle cx="6" cy="12" r="2.5" {...common} />
                <Circle cx="18" cy="19" r="2.5" {...common} />
                <Path d="m8.2 10.8 7.6-4.5m-7.6 7.9 7.6 4.5" {...common} />
            </>
        ),
        sparkle: (
            <Path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z" {...common} />
        ),
        sun: (
            <>
                <Circle cx="12" cy="12" r="4" {...common} />
                <Path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" {...common} />
            </>
        ),
        thumbDown: (
            <Path
                d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3Zm0 0 4-8a3 3 0 0 1 3 3v5h5a2 2 0 0 1 2 2l-1.5 7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9Z"
                transform="rotate(180 12 12)"
                {...common}
            />
        ),
        thumbUp: (
            <Path
                d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3Zm0 0 4-8a3 3 0 0 1 3 3v5h5a2 2 0 0 1 2 2l-1.5 7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9Z"
                {...common}
            />
        ),
    };

    return (
        <Svg
            accessibilityElementsHidden
            height={size}
            viewBox="0 0 24 24"
            width={size}>
            {shapes[name]}
        </Svg>
    );
};

export type { IconName };
export default AppIcon;
