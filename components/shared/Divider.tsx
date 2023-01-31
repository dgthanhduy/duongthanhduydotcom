type dividerProps = {
    caption?: string;
};

const Divider = ({ caption }: dividerProps) => {
    return caption ? (
        <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t-2 border-slate-300 dark:border-slate-600"></div>
            <span className="flex-shrink mx-4 text-slate-300 dark:text-slate-600">
                {caption}
            </span>
            <div className="flex-grow border-t-2 border-slate-300 dark:border-slate-600"></div>
        </div>
    ) : (
        <div className="my-4 border-t-2 border-slate-300 dark:border-slate-600"></div>
    );
};

export default Divider;
