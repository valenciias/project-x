import { SiGithub } from 'react-icons/si';

interface FooterLink {
    href: string;
    label: string;
    external?: boolean;
}

const footerLinks: FooterLink[] = [
    {
        href: 'https://github.com/your-repo',
        label: 'GitHub',
        external: true,
    },
    { href: '/white-paper', label: 'White paper' },
    { href: '/contributors', label: 'Contributors' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
];

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 w-full bg-transperent backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2 mb-4 sm:mb-0">
                    <span>Powered by ElizaOS. Data from IlluminatiBot.</span>
                </div>
                <nav className="flex items-center gap-4 flex-wrap justify-center">
                    {footerLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                            className="hover:text-primary-foreground transition-colors duration-200 hover:underline"
                            aria-label={link.label}
                        >
                            {link.href.includes('github') ? (
                                <SiGithub className="w-5 h-5" />
                            ) : (
                                link.label
                            )}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
};