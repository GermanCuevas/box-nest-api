# Semantic Versioning (Semver) Documentation

## Table of Contents

1. **Introduction**
2. **Semantic Versioning (Semver)**
3. **Conclusion**
4. **Glossary**

## 1. Introduction

This document describes the guidelines that this project follows. These guidelines includes Semver rules.

The aim is to provide consistency in our development work and progression.

## 2. Semantic Versioning (Semver)

Semantic Versioning (Semver) is a versioning scheme for software that help us to determine the changes of the developed software through time.

The version format is `MAJOR.MINOR.PATCH`. We increment these values following these rules:

- MAJOR version when we make incompatible or breaking changes.
- MINOR version when we add functionality in a backward-compatible manner.
- PATCH version when we make backward-compatible bug fixes.

Remember that for any versions prior to 1.0.0, the software should be considered unstable and changes may still be introduced that break backward compatibility.

That is why we start our versioning at `0.1.0` and will increment the `MAJOR` number to `1.0.0` when we are ready to release our first stable version.

## 1.1 Semver flow

### MAJOR Changes

- When we make incompatible changes to the software that will break backward compatibility (breaking changes).
- Only increment the `MAJOR` version when we are ready to release a new stable version.
- Reset the `MINOR` and `PATCH` versions to `0`.

### MINOR Changes

- When we add new functionality in a backward-compatible manner.
- Increment the `MINOR` version when we are ready to release a new stable version.
- Reset the `PATCH` version to `0`.

### PATCH Changes

- When we make backward-compatible bug fixes.
- Increment the `PATCH` version when we are ready to release a new stable version.

## 2. Conclusion

By adhering to Semantic Versioning, we are able to clearly communicate the nature of changes with each new version.

## 3. Glossary

- **Semantic Versioning (Semver)**: A versioning scheme for software that aims to convey meaning about the underlying changes with each new release. The version format is `MAJOR.MINOR.PATCH`.
