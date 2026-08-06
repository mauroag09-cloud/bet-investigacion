interface ArticleLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}

export const ArticleLayout = ({ children, title, lastUpdated }: ArticleLayoutProps) => {
  return (
    <article className="py-12 bg-[#EDE6D6] min-h-screen">
      <div className="container mx-auto px-6 max-w-[720px]">
        <h1 className="font-fraunces text-4xl font-bold text-[#14213D] mb-4">
          {title}
        </h1>
        {lastUpdated && (
          <p className="font-inter text-sm text-[#14213D]/50 mb-8">
            Última actualización: {lastUpdated}
          </p>
        )}
        <div className="prose prose-lg prose-tinta max-w-none font-inter text-[#14213D]/80 leading-relaxed [&>h2]:font-fraunces [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#14213D] [&>h2]:mt-8 [&>h2]:mb-4 [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>li]:mb-1">
          {children}
        </div>
      </div>
    </article>
  );
};
