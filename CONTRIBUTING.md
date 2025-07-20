# Contributing to Caker Simple

Terima kasih atas minat Anda untuk berkontribusi pada Caker Simple! 🚀

## 🤝 How to Contribute

### 1. Fork dan Clone Repository

```bash
# Fork repository di GitHub
# Kemudian clone fork Anda
git clone https://github.com/YOUR_USERNAME/caker-simple.git
cd caker-simple
```

### 2. Setup Development Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env.local

# Edit .env.local dengan konfigurasi Anda
# MONGODB_URI=mongodb://localhost:27017/caker-simple

# Run development server
npm run dev
```

### 3. Buat Branch untuk Fitur

```bash
# Buat branch baru
git checkout -b feature/amazing-feature

# Atau untuk bug fix
git checkout -b fix/bug-description
```

### 4. Development Guidelines

#### Code Style
- Gunakan **TypeScript** untuk semua file
- Ikuti **ESLint** dan **Prettier** configuration
- Gunakan **Tailwind CSS** untuk styling
- Tulis **descriptive commit messages**

#### File Structure
```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
├── lib/               # Utility functions
└── types/             # TypeScript types
```

#### Component Guidelines
- Gunakan **functional components** dengan hooks
- Implement **TypeScript interfaces** untuk props
- Gunakan **Tailwind CSS** untuk styling
- Tambahkan **JSDoc comments** untuk complex functions

#### API Guidelines
- Gunakan **Next.js API routes**
- Implement **proper error handling**
- Return **consistent response format**
- Add **input validation**

### 5. Testing

#### Manual Testing
```bash
# Test HR flow
1. Buka http://localhost:3000
2. Pilih "Saya HR"
3. Masukkan deskripsi lowongan
4. Verifikasi hasil matching

# Test Looker flow
1. Pilih "Saya Job Seeker"
2. Isi form CV
3. Verifikasi hasil matching
```

#### API Testing
```bash
# Test HR API
curl -X POST http://localhost:3000/api/hr \
  -H "Content-Type: application/json" \
  -d '{"jobDescription":"Software Engineer dengan React"}'

# Test Looker API
curl -X POST http://localhost:3000/api/looker \
  -H "Content-Type: application/json" \
  -d '{"cvData":{"name":"John","experience":"React developer"}}'
```

### 6. Commit dan Push

```bash
# Add changes
git add .

# Commit dengan message yang jelas
git commit -m "feat: add authentication system"

# Push ke fork Anda
git push origin feature/amazing-feature
```

### 7. Buat Pull Request

1. Buka GitHub repository Anda
2. Klik "Compare & pull request"
3. Isi template PR dengan detail:
   - **Description**: Jelaskan perubahan
   - **Type**: feat/fix/docs/style/refactor/test/chore
   - **Testing**: Bagaimana Anda test perubahan
   - **Screenshots**: Jika ada perubahan UI

## 📋 Pull Request Template

```markdown
## Description
Jelaskan perubahan yang Anda buat

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Manual testing dilakukan
- [ ] API testing dilakukan
- [ ] UI testing dilakukan

## Screenshots
Jika ada perubahan UI, tambahkan screenshot

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review of code completed
- [ ] Code is commented, particularly in hard-to-understand areas
- [ ] Corresponding changes to documentation made
- [ ] No new warnings generated
- [ ] Tests added that prove fix is effective or feature works
```

## 🏷️ Commit Message Convention

Gunakan [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat: add authentication system
fix: resolve embedding generation error
docs: update README with new features
style: format code with prettier
refactor: improve similarity algorithm
test: add unit tests for API endpoints
chore: update dependencies
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

## 🐛 Bug Reports

### Bug Report Template

```markdown
## Bug Description
Jelaskan bug yang Anda temukan

## Steps to Reproduce
1. Buka aplikasi
2. Lakukan action X
3. Error terjadi

## Expected Behavior
Apa yang seharusnya terjadi

## Actual Behavior
Apa yang benar-benar terjadi

## Environment
- OS: macOS/Windows/Linux
- Browser: Chrome/Firefox/Safari
- Node.js version: 18.x
- MongoDB version: 6.x

## Screenshots
Jika ada, tambahkan screenshot error
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Jelaskan fitur yang Anda inginkan

## Problem Statement
Masalah apa yang fitur ini akan selesaikan

## Proposed Solution
Bagaimana fitur ini akan bekerja

## Alternative Solutions
Alternatif lain yang sudah dipertimbangkan

## Additional Context
Informasi tambahan yang relevan
```

## 🧪 Testing Guidelines

### Unit Testing
```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Integration Testing
```bash
# Test API endpoints
npm run test:api

# Test UI components
npm run test:ui
```

### E2E Testing
```bash
# Test complete user flows
npm run test:e2e
```

## 📚 Documentation

### Code Documentation
- Gunakan **JSDoc** untuk functions dan classes
- Tulis **README** untuk complex components
- Update **API documentation** untuk new endpoints

### User Documentation
- Update **README.md** untuk new features
- Add **screenshots** untuk UI changes
- Update **CHANGELOG.md** untuk releases

## 🚀 Release Process

### Pre-release Checklist
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped in package.json
- [ ] Environment variables documented

### Release Steps
1. Create release branch: `git checkout -b release/v1.1.0`
2. Update version in `package.json`
3. Update `CHANGELOG.md`
4. Commit changes: `git commit -m "chore: release v1.1.0"`
5. Create tag: `git tag v1.1.0`
6. Push branch and tag: `git push origin release/v1.1.0 --tags`
7. Create GitHub release

## 🤝 Community Guidelines

### Code of Conduct
- **Be respectful** kepada semua contributors
- **Be constructive** dalam feedback
- **Be patient** dengan newcomers
- **Be helpful** dalam discussions

### Communication
- Gunakan **GitHub Issues** untuk discussions
- Gunakan **GitHub Discussions** untuk questions
- Gunakan **Pull Requests** untuk code changes
- Gunakan **GitHub Releases** untuk announcements

## 🎯 Getting Help

### Resources
- **Documentation**: README.md dan inline comments
- **Issues**: GitHub Issues untuk bugs dan features
- **Discussions**: GitHub Discussions untuk questions
- **Wiki**: Project wiki untuk detailed guides

### Contact
- **Email**: development@caker-simple.com
- **Discord**: Join our community server
- **Twitter**: Follow @caker_simple

---

**Thank you for contributing to Caker Simple! 🚀**

Your contributions help make this project better for everyone. 