import { MDXProvider } from "@mdx-js/react";
import { Divider } from "@mui/material";
import Link from "next/link";

const components: React.ComponentProps<typeof MDXProvider>["components"] = {
  //   li: (props) => <li className="float-left inline ml-[2px" {...props} />,
  ol: (props) => <ol className="list-decimal pl-[2em]" {...props} />,
  ul: (props) => <ul className="list-disc pl-[2em]" {...props} />,
  p: (props) => <p className="my-[.5em]" {...props} />,
  a: (props) => {
    const { href, ...cleanProps } = props;
    return (
      <Link
        href={`${href}`}
        {...cleanProps}
        className="text-blue-400 underline"
      />
    );
  },
  hr: (props) => {
    const { ref, ...cleanProps } = props;

    return <Divider {...cleanProps} />;
  },
};

export default components;
