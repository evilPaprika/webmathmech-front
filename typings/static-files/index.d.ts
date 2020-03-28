declare module '*.svg' {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default value;
}

declare module '*.jpg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}

declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.webp' {
    const content: string;
    export default content;
}
