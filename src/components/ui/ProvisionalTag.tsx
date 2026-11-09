/** Marca conteúdo (imagem, texto ou número) que será substituído por material oficial. */
export function ProvisionalTag({ children = 'Imagem ilustrativa provisória', className = '' }: { children?: string; className?: string }) {
  return (
    <span className={`inline-block bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm ${className}`}>
      {children}
    </span>
  )
}
