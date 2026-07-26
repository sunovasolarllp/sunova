import json

with open(r'C:\Users\a1ypwgg0\.gemini\antigravity\brain\f4ed0b53-8f60-4165-9295-fee90d385e85\.system_generated\logs\transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if 'wss.kseb.in' in line and 'TargetContent' in line:
            try:
                data = json.loads(line.strip())
                if 'tool_calls' in data:
                    for tool in data['tool_calls']:
                        if 'args' in tool:
                            content = ""
                            if 'ReplacementChunks' in tool['args']:
                                content = tool['args']['ReplacementChunks'][0].get('TargetContent', '')
                            elif 'TargetContent' in tool['args']:
                                content = tool['args']['TargetContent']
                            if 'wss.kseb.in' in content:
                                print(content)
            except Exception as e:
                pass
