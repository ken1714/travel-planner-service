## PR発行手順（GitHub CLI前提）

前提: コミット・push済みの状態からPRを作成する。

1. **ベースブランチを決める**  
   - 指示がなければ`main`にマージする。  
   - Issueやチーム方針で別ブランチ指定がある場合はそちらを優先し、`<base-branch>`をメモしておく。

2. **作業内容の確認**  
   - `git status`/`git diff`で差分を確認し、不要なファイルが含まれていないかチェックする。  
   - 必要なテストを実行して結果を確認しておく。

3. **PR本文をテンプレートに従って用意**  
   - `.github/PULL_REQUEST_TEMPLATE.md`を開き、以下を埋める:  
     - `概要`: 実装/修正の概要を1–3行で記載  
     - `変更内容`: 主要な変更点を箇条書きで記載  
     - `変更理由`: なぜ必要か、背景や目的を明記  
     - `その他`: 留意点・追加情報があれば記載  
   - 上記を下書きしておくか、`gh pr create`実行時のエディタで記入する。

4. **GitHub CLIでPR作成**  
   - PRを作成:  
     ```
     gh pr create \
       --title "<タイトル>" \
       --base <base-branch|main> \
       --body-file .github/PULL_REQUEST_TEMPLATE.md \
       --assignee @me
     ```  
     - `<base-branch>`は手順1で決めたもの。指示がなければ`main`。  
     - 既に下書きした本文を使う場合は一時ファイルに保存し、`--body-file`で指定する。  
     - `--assignee @me`で現在ログイン中のユーザーをAssigneeに設定する。
