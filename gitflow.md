# Git Workflow Documentation

## Table of Contents

1. **Introduction**
2. **Branching Model**
3. **Workflow**
4. **Conclusion**
5. **Glossary**

## 1. Introduction

This document describes the guidelines that this project follows. These guidelines includes Git Workflow rules.

The aim is to provide consistency in our development work and progression.

## 2. Branching Model

We use five types of branches in our project:

- `main`: This is our main branch and the source of our stable code. Merges to this branch are allowed only from `release` and `hotfix` branches.
- `develop`: This is our latest non-stable prior to release code. This branch is where all `feature` and `bugfix` branches are constantly merged to.
- `feature`: These branches are used to develop new features and once they are finished, they are merged into the `develop` branch through pull request.
- `bugfix`: These branches are similar to `feature` branches. The difference resides in they are for fixing encountered bugs in the `develop` branch. Once they are finished, they are merged into the `develop` branch through pull request.
- `release`: These branches are created from the `develop` branch once the code has reached a level of stability and a amount of new functionalities or bugfixes that requires a new release. Release branches will merge through pull requests to both `main` and `develop` branches. They will come with changelog documentation. These branches changes the version of the codebase.
- `hotfix`: These branches are created from `main` branch. The aim for these branches is to fix urgent bugs in `main` branch that were mistakenly present in the latest release. Once the work is finished, they are merged to both `main` and `develop` branches. These branches changes the version of the codebase.

### 2.1 Branching Naming Model

#### Main

```sh
main
```

### Develop

```sh
develop
```

### Feature

```sh
feature/feature-name-goes-here
```

### Bugfix

```sh
bugfix/bug-name-goes-here
```

### Release

```sh
release/x.y.z -> (x.y.z is the version number)
```

### Hotfix

```sh
hotfix/x.y.z -> (x.y.z is the version number)
```

## 3. Workflow

Here is a detailed overview of our workflow:

### 3.1 Feature Development

When starting to work on a new feature, create a new branch from `develop`:

```sh
git checkout -b feature/new-feature develop
```

After finishing entirely the work on this feature, once testing is finished and succeeded, push the branch to the remote repository:

```sh
git push origin feature/new-feature
```

Then create a pull request in GitHub from `feature/new-feature` to `develop`. The code should be reviewed and approved for at least `one collaborator` before this branch is able to get merged into `develop`.

Upon a successful merge into `develop` and verifying the changes, consider removing the feature branch to keep an organized repository.
This helps maintain a clean repository without unnecessary branches.

### 3.2 Bugfix Development

Similarly to feature development, when starting work on a bug, create a new `bugfix` branch from `develop`:

```sh
git checkout -b bugfix/bug-name develop
```

After the bug is fixed, push the branch to the remote repository and create a pull request to `develop`:

```sh
git push origin bugfix/bug-name
```

Once the pull request is reviewed and approved by at least `one collaborator`, it can be merged into `develop`.

Upon a successful merge into `develop` and verifying the changes, consider removing the bugfix branch to keep an organized repository.
This helps maintain a clean repository without unnecessary branches.

### 3.3 Release Preparation

When the `develop` branch has acquired enough features and / or bugfixes for a release, you need to prepare for a release. This involves creating a new branch `release/x.y.z` where `x.y.z` is the new version number according to Semver rules:

```sh
git checkout -b release/x.y.z develop
```

This branch is the one that is used to prepare the release. Once the release branch is ready, create a tag that references the latest commit with the updated version, push the branch and the tag to the remote so it can be finally merged into `main` and `develop`:

```sh
git tag -a 1.1.0 -m "version 1.1.0"
git push origin release/1.1.0
git push origin release/1.1.0 --tags
```

### 3.4 Release Deployment

Once the release branch is ready, create a pull request to `main` and another one to `develop`. After both pull request are reviewed and ready to go, they can be finally merged.

### 3.5 Hotfixes

If there are bugs in the `main` branch, they should be fixed through a `hotfix` branch:

```sh
git checkout -b hotfix/1.1.1 main
```

After the fix, create a tag with the corresponding version update and push the tag and the hotfix branch to the remote repository:

```sh
git tag -a 1.1.1 -m "version 1.1.1"
git push origin hotfix/1.1.1
git push origin hotfix/1.1.1 --tags
```

Then create a pull request to both `main` and `develop`, once the pull request is reviewed and approved, it can be merged.

## 4. Conclusion

This Git workflow model provides us with a robust structure for managing our project's development. By using develop, feature, bugfix, release and hotfix branches in combination with GitHub's pull request mechanism, we can ensure code quality and maintainability.

## 5. Glossary

- **Git**: A distributed version control system for tracking changes in source code during software development.
- **GitHub**: A hosting platform for Git repositories that provides a web-based graphical interface. It also provides access control and collaboration features, such as bug tracking, feature requests, task management, and continuous integration.
- **Semantic Versioning (Semver)**: A versioning scheme for software that aims to convey meaning about the underlying changes with each new release. The version format is `MAJOR.MINOR.PATCH`.
- **Branch**: In Git, a branch is a pointer to a specific commit. It represents an independent line of development that stems from a commit.
- **`main` branch**: The default development branch. Whenever you create a repository, a branch named `main` is created, and becomes the active branch. In most cases, this contains the stable code.
- **`develop` branch**: This branch represents the latest development work to be included in the next release.
- **`feature` branch**: These branches are used to develop new features for the upcoming or a distant future release. When the feature is complete, it is merged into the `develop` branch.
- **`bugfix` branch**: These branches are used for fixing bugs. They are created from `develop`, and are merged back into `develop` when the fix is complete.
- **`release` branch**: These branches are branched off from the `develop` branch for the purpose of preparing for a new production release.
- **`hotfix` branch**: These branches are used to quickly patch production releases. They are branched off from the `main` branch and are merged back into both `main` and `develop` when the fix is complete.